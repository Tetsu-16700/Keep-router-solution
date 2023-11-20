import { deleteNote, editNote } from "../services/notes";

export async function action({ request, params }) {
  const noteId = params.noteId;
  let formData = await request.formData();

  switch (request.method) {
    case "PATCH": {
      const updates = Object.fromEntries(formData.entries());
      if (updates.deleted) {
        updates.deleted = updates.deleted === "true" ? true : false;
      }
      await editNote(noteId, updates);
      return null;
    }
    case "DELETE": {
      await deleteNote(noteId);
      return null;
    }

    default: {
      throw new Response("Action not implemented", { status: 405 });
    }
  }
}
