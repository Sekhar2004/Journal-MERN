import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Main from "../../components/Main/Main";
import Button from "../../components/Button/Button";
import GlobalContext from "../../Context/GlobalContext";

const EditDiary = () => {
    const { axiosInstance } = useContext(GlobalContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [diary, setDiary] = useState({
        title: "",
        about: "",
        content: "",
        cover: "",
        color: "",
        time: "",
    });

    useEffect(() => {
        const fetchDiary = async () => {
            try {
                const response = await axiosInstance.get(`/api/diary/single/${id}`);
                setDiary(response.data);
            } catch (error) {
                console.error("Error fetching diary:", error);
            }
        };
        fetchDiary();
    }, [axiosInstance, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiary({
            ...diary,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/api/diary/${id}`, diary);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error editing diary:", error);
        }
    };

    return (
        <Main>
            <section className="edit-diary">
                <h2>Edit Diary Entry</h2>
                <form onSubmit={handleSubmit}>
                    <div className="edit-diary-form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={diary.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Add other input fields for editing */}
                    <Button type="submit" text="Save Changes" />
                </form>
            </section>
        </Main>
    );
};

export default EditDiary;
