import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { Note } from './helpers/types';

type NoteLayoutProps = {
  notes: Note[];
};

export const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (!note) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
};

export const useNote = () => {
  return useOutletContext<Note>();
};
