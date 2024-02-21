import { useLoaderData } from "react-router-dom";

export default function DeleteConact() {
	const { contact } = useLoaderData();
	console.log(contact);
	return (
		<div>
			<p>Deleting contact...</p>
		</div>
	);
}
