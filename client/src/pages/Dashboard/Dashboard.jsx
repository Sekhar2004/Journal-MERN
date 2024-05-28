import React, { useState, useEffect, useContext } from "react";
import { Home, Edit2, Trash2 } from "react-feather";
import Main from "../../components/Main/Main";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import GlobalContext from "../../Context/GlobalContext";
import SnackBar from "../../components/SnackBar/SnackBar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { axiosInstance, setIsLoading } = useContext(GlobalContext);
    const [diaries, setDiaries] = useState([]);
    const [snack, setSnack] = useState({
        text: "Registered successfully, create your profile now",
        bgColor: "var(--green)",
        color: "var(--white)",
    });
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const getDiaries = async () => {
        setIsLoading(true); // Set loading state
        try {
            const response = await axiosInstance("/api/diary/all");
            setDiaries([...response.data]);
        } catch (error) {
            console.error("Error fetching diaries:", error);
            setSnack({
                text: error.response.data.message,
                bgColor: "var(--red)",
                color: "var(--white)",
            });
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        getDiaries();
    }, []);

    const handleEdit = (id) => {
        navigate(`/diary/edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/api/diary/${id}`);
            setDiaries(diaries.filter((diary) => diary._id !== id));
            setSnack({
                text: "Diary entry deleted successfully",
                bgColor: "var(--green)",
                color: "var(--white)",
            });
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        } catch (error) {
            console.error("Error deleting diary entry:", error);
            setSnack({
                text: error.response.data.message,
                bgColor: "var(--red)",
                color: "var(--white)",
            });
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        }
    };

    return (
        <Main>
            <section className="dashboard">
                <Header icon={<Home />} />
                <div className="dashboard-body">
                    <div className="row">
                        {diaries.map((diary, index) => (
                            <div className="col-lg-33 col-md-100 col-sm-100" key={index}>
                                <Card card={diary}>
                                    <div className="card-content-addons__edit">
                                        <button onClick={() => handleEdit(diary._id)}>
                                            <Edit2 />
                                        </button>
                                    </div>
                                    <div className="card-content-addons__delete">
                                        <button onClick={() => handleDelete(diary._id)}>
                                            <Trash2 />
                                        </button>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {open && (
                <SnackBar
                    text={snack.text}
                    bgColor={snack.bgColor}
                    color={snack.color}
                    close={() => setOpen(false)}
                />
            )}
        </Main>
    );
};

export default Dashboard;
