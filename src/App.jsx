import { useState } from "react";
import "./App.css";

const App = () => {
	const [items, setItems] = useState([
		{ name: "IPhone 14 Pro X", quantity: 10, id: 1 },
		{ name: "Samsung S22 Ultra", quantity: 10, id: 2 },
		{ name: "OnePlus 9", quantity: 5, id: 3 },
	]);

	const totalItemsInArr = items.reduce((acc, item) => {
		return acc + item.quantity;
	}, 0);

	const [total, setTotal] = useState(totalItemsInArr);
	const [inputValue, setInputValue] = useState("");

	const addItem = () => {
		if (inputValue === "") return;

		// add id no as item increase
		const addId = items.length + 1;
		const newItem = { name: inputValue, quantity: 1, id: addId };
		const newItems = [...items, newItem];
		const newTotal = total + parseInt(newItem.quantity);

		setItems(newItems);
		setTotal(newTotal);
		setInputValue("");
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			addItem();
		}
	};

	const increaseQuantity = (index) => {
		const newItems = [...items];
		newItems[index].quantity++;
		const newTotal = total + 1;

		setItems(newItems);
		setTotal(newTotal);
	};

	const decreaseQuantity = (index) => {
		if (items[index].quantity === 1) return;

		const newItems = [...items];
		newItems[index].quantity--;
		const newTotal = total - 1;

		setItems(newItems);
		setTotal(newTotal);
	};

	const editItemName = (index, newName) => {
		const newItems = [...items];
		newItems[index].name = newName;

		setItems(newItems);
	};

	const removeItem = (index) => {
		const item = items.find((item) => item.id === index);
		if (item) {
			const newItems = items.filter((i) => i.id !== index);
			setItems(newItems);
			setTotal(total - item.quantity);
		} else {
			console.error("Item not found");
		}
	};

	return (
		<div className="p-5 h-full w-full flex flex-col items-center">
			<h1 className="text-2xl font-bold mb-6 w-full text-center">
				Shopping Cart
			</h1>
			<div className="mb-4 w-full flex justify-center">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					className="border p-2 mr-2 outline-none w-1/4"
					placeholder="Add an item..."
				/>
				<button
					onClick={addItem}
					className="bg-blue-500 text-white py-1 px-4 hover:bg-blue-600"
				>
					Add
				</button>
			</div>

			<ul className="px-5 py-2 rounded-md bg-orange-300 min-h-[70vh] max-h-[70vh] w-[50vw] overflow-y-scroll">
				{items.map((item, index) => (
					<li key={index} className="flex items-center  mb-2 border-b p-2">
						<div className="flex items-center mr-28">
							<div className="w-10">{item.id}</div>
							<input
								type="text"
								value={item.name}
								onChange={(e) => editItemName(index, e.target.value)}
								className="border p-1 mr-2 flex-1"
							/>
						</div>
						<button
							onClick={() => decreaseQuantity(index)}
							className="bg-gray-300 text-black w-10 rounded-md"
						>
							-
						</button>
						<span className="text-sm w-20 text-center">
							Quantity: {item.quantity}
						</span>
						<button
							onClick={() => increaseQuantity(index)}
							className="bg-gray-300 text-black w-10 rounded-md"
						>
							+
						</button>
						<button
							className="bg-red-500 text-white py-1 px-2 ml-10 w-10 rounded-md"
							onClick={() => removeItem(item.id)}
						>
							X
						</button>
					</li>
				))}
			</ul>
			<div className="mt-4">
				<span className="font-bold">Total:</span> {total}
			</div>
		</div>
	);
};

export default App;
