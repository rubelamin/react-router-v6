import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Contact from "./components/Contact";
import EditContact from "./components/EditContact";
import Error from "./components/Error";
import Index from "./routes";
import Root from "./routes/root";
import {
	contactsLoader,
	createContactAction,
	deleteContactAction,
	favoriteAction,
	getContactDetailsLoader,
	updateContactAction,
} from "./utils/resource";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		loader: contactsLoader,
		action: createContactAction,
		children: [
			{
				errorElement: <Error />,
				children: [
					{
						index: true,
						element: <Index />,
					},
					{
						path: "/contacts/:contactId",
						element: <Contact />,
						loader: getContactDetailsLoader,
						action: favoriteAction,
					},
					{
						path: "/contacts/:contactId/edit",
						element: <EditContact />,
						loader: getContactDetailsLoader,
						action: updateContactAction,
					},
					{
						path: "/contacts/:contactId/destroy",
						action: deleteContactAction,
						errorElement: <div>Deleting error occur</div>,
					},
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
