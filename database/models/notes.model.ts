export type Notes = {
  title: string;
  body: string;
};

export type NotesWithTags = {
  note_id: number;
  title: string; 
  body: string; 
  tag_id: (number | null)[];
  tag_name: (string | null)[];
}