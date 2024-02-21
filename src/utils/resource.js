import { redirect } from "react-router-dom";
import {
	createContact,
	deleteContact,
	getContact,
	getContacts,
	updateContact,
} from "../data/contact";

export const contactsLoader = async ({ request }) => {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const contacts = await getContacts(q);
	return { contacts, q };
};

export const createContactAction = async () => {
	const contact = await createContact();

	return { contact };
};

export const getContactDetailsLoader = async ({ params }) => {
	const contact = await getContact(params.contactId);
	if (!contact) {
		throw new Response("", {
			status: 404,
			statusText: "Contact Not Found",
		});
	}
	return { contact };
};

export const updateContactAction = async ({ request, params }) => {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);

	await updateContact(params.contactId, updates);
	return redirect(`/contacts/${params.contactId}`);
};

export const deleteContactAction = async ({ params }) => {
	// throw new Error("I am going to be error");
	await deleteContact(params.contactId);

	return redirect("/");
};

export const favoriteAction = async ({ request, params }) => {
	let formData = await request.formData();
	console.log(formData.get("favorite"));
	return updateContact(params.contactId, {
		favorite: formData.get("favorite") === "true",
	});
};
