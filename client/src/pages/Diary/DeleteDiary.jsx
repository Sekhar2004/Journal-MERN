import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../../components/Main/Main";
import Button from "../../components/Button/Button";
import GlobalContext from "../../Context/GlobalContext";

const DeleteDiary = ({ id }) => {
    const { axiosInstance } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/api/diary/${id}`);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error deleting diary:", error);
        }
    };

    const handleCancel = () => {
        navigate("/dashboard");
    };

    return (
        <Main>
            <section className="delete-diary">
                <h2>Delete Diary Entry</h2>
                <p>Are you sure you want to delete this diary entry?</p>
                <div className="delete-diary-buttons">
                    <Button text="Delete" onClick={handleDelete} />
                    <Button text="Cancel" onClick={handleCancel} />
                </div>
            </section>
        </Main>
    );
};

export default DeleteDiary;
