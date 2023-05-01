import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreatebleReactSelect from 'react-select/creatable';
import { NoteData, Tag } from './App';
import { v4 as uuidv4 } from 'uuid';

type NoteFormProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

const NoteForm = ({ onSubmit, onAddTag, availableTags }: NoteFormProps) => {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: [],
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId='title'>
							<Form.Label>Title</Form.Label>
							<Form.Control ref={titleRef} required type='text' />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId='tags'>
							<Form.Label>Title</Form.Label>
							<CreatebleReactSelect
								onCreateOption={(label) => {
									const newTag = { id: uuidv4(), label };
									onAddTag(newTag);
									setSelectedTags((prevTags) => [...prevTags, newTag]);
								}}
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								value={selectedTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => {
											return { id: tag.value, label: tag.label };
										})
									);
								}}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId='markdown'>
					<Form.Label>Body</Form.Label>
					<Form.Control ref={markdownRef} required as='textarea' rows={15} />
				</Form.Group>
				<Stack direction='horizontal' gap={2} className='justify-content-end'>
					<Button type='submit' variant='primary'>
						Save
					</Button>
					<Link to='..'>
						<Button type='button' variant='outline-secondary'>
							Cancel
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	);
};

export default NoteForm;