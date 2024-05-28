import React, { useContext, useEffect, useState } from "react";
import { Book, Calendar, Clock } from "react-feather";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import GlobalContext from "../../Context/GlobalContext";
import "./diary.css";

const Diary = () => {
    const { axiosInstance } = useContext(GlobalContext);
    const { id } = useParams();
    const body = document.querySelector("body");
    const [diary, setDiary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getDiary = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance(`/api/diary/single/${id}`);
            setDiary({ ...response.data, time: new Date(response.data.time) });
            body.style.backgroundImage = `url(${response.data.cover})`;
        } catch (error) {
            console.error("Error fetching diary:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDiary();
    }, [id]);

    return (
        <Main>
            <section className="diary">
                <Header icon={<Book />} />
                {!isLoading && diary && (
                    <div className="diary-body">
                        <div className="diary-title">
                            <h1>{diary.title}</h1>
                        </div>
                        <span className="diary-about">{diary.about}</span>
                        <div className="diary-schedule">
                            <div className="diary-date">
                                <Calendar />
                                <span>{`${diary.time.getDate()}/${diary.time.getMonth() + 1}/${diary.time.getFullYear()}`}</span>
                            </div>
                            <div className="diary-time">
                                <Clock />
                                <span>{`${diary.time.getHours()}:${diary.time.getMinutes().toString().padStart(2, '0')}`}</span>
                            </div>
                        </div>
                        <div
                            className="diary-content"
                            dangerouslySetInnerHTML={{ __html: diary.content }}
                        ></div>
                    </div>
                )}
            </section>
        </Main>
    );
};

export default Diary;
