import * as React from "react";
import { useNavigate } from "react-router-dom";

import AddEditQuiz from "./AddEditQuiz";
import { apiRoutes } from "./util";

function AddQuiz() {
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const res = await fetch(apiRoutes.quiz, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            const { _id } = await res.json();
            navigate(`/quiz/${_id}`);
        } else {
            throw new Error("创建试卷失败");
        }
    };

    return <AddEditQuiz onSubmit={onSubmit} title="创建试卷" />;
}

export default AddQuiz;