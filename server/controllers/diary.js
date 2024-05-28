import User from "../models/User.js";
import Diary from "../models/Diary.js";

const newDiary = async (req, res) => {
	const { title, about, content, cover, color, time } = req.body;
	try {
		const newDiary = new Diary({
			user: req.user.id,
			title,
			about,
			content,
			cover,
			color,
			time,
		});
		const diary = await newDiary.save();
		res.status(200).json({ diary, message: "Added diary successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const all = async (req, res) => {
	try {
		const diaries = await Diary.find({ user: req.user.id });
		console.log(diaries);
		if (!diaries.length)
			return res.status(404).json({ message: "Diary entries not found" });
		res.status(200).json(diaries);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
};

const single = async (req, res) => {
	console.log(req.params.id);
	try {
		const diary = await Diary.findOne({ _id: req.params.id });
		console.log(diary);
		if (!diary)
			return res.status(404).json({ message: "Diary entry not found" });
		res.status(200).json(diary);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
};

const updateDiary = async (req, res) => {
	const { title, about, content, cover, color, time } = req.body;
	try {
		let diary = await Diary.findById(req.params.id);

		if (!diary) {
			return res.status(404).json({ message: "Diary entry not found" });
		}

		// Check if the diary belongs to the logged-in user
		if (diary.user.toString() !== req.user.id) {
			return res.status(401).json({ message: "Not authorized" });
		}

		diary = await Diary.findByIdAndUpdate(
			req.params.id,
			{ title, about, content, cover, color, time },
			{ new: true }
		);

		res.json({ diary, message: "Diary updated successfully" });
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: err.message });
	}
};

const deleteDiary = async (req, res) => {
	try {
		let diary = await Diary.findById(req.params.id);

		if (!diary) {
			return res.status(404).json({ message: "Diary entry not found" });
		}

		// Check if the diary belongs to the logged-in user
		if (diary.user.toString() !== req.user.id) {
			return res.status(401).json({ message: "Not authorized" });
		}

		await Diary.findByIdAndDelete(req.params.id);

		res.json({ message: "Diary deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
};

export { newDiary, all, single, updateDiary, deleteDiary };
