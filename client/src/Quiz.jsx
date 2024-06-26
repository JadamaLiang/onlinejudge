import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useParams } from "react-router-dom";

import { apiRoutes, gradingTypes } from "./util";

function Quiz() {
    const { id } = useParams();
    const [quiz, setQuiz] = React.useState(undefined);
    const [copy, setCopy] = React.useState(undefined);

    React.useEffect(() => {
        fetch(apiRoutes.quiz + `/${id}`)
            .then((res) => res.json())
            .then((data) =>
                setQuiz({
                    ...data,
                    questions: data.questions.map((question, index) => {
                        if (question.type === "single")
                            question.answer = [question.answer];
                        return { ...question, index };
                    }),
                })
            );
    }, [id]);

    const filterQuestions = (type) =>
        quiz.questions.filter((question) => question.type === type);

    const onClickCopy = () => {
        setCopy("");
        const url = `/quiz-attempt/add/${id}`;
        navigator.clipboard.writeText(window.location.origin + url).then(
            () => {
                setCopy(url);
                setTimeout(() => setCopy(undefined), 3000);
            },
            () => {
                setCopy(null);
                setTimeout(() => setCopy(undefined), 3000);
            }
        );
    };

    const CopyButtonIcon = () => {
        if (copy === null) return <PriorityHighIcon />;
        if (copy === "") return <CircularProgress size={24} />;
        if (copy) return <DoneIcon />;
        return <ContentCopyIcon />;
    };

    if (quiz === undefined) return <LinearProgress />;
    if (quiz === null) return <h1>未找到试卷</h1>;

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            maxWidth={800}
            mx="auto"
        >
            <Typography variant="h4" gutterBottom>
                {quiz.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
                {quiz.totalGrade} 分
            </Typography>
            <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
                <Button
                    component={Link}
                    to={`/quiz/${id}/edit`}
                    startIcon={<EditIcon />}
                >
                    修改
                </Button>
                <Button
                    color={
                        copy === null ? "error" : copy ? "success" : "primary"
                    }
                    startIcon={<CopyButtonIcon />}
                    onClick={onClickCopy}
                >
                    分享
                </Button>
                <Button
                    component={Link}
                    to={`/quiz-attempt/quiz/${id}`}
                    startIcon={<PeopleIcon />}
                >
                    尝试报告
                </Button>
            </ButtonGroup>
            <TrueFalseQuestions
                questions={filterQuestions("trueFalse")}
                disabled
            />
            <SingleChoiceQuestions
                questions={filterQuestions("single")}
                disabled
            />
            <MultipleChoiceQuestions
                questions={filterQuestions("multi")}
                disabled
            />
            <FillInBlankQuestions
                questions={filterQuestions("fillInBlank")}
                disabled
            />
        </Box>
    );
}

export const TrueFalseQuestions = ({ questions, disabled }) => {
    if (!questions.length) return null;
    return (
        <List
            subheader={<ListSubheader>判断题</ListSubheader>}
            sx={{ width: "100%" }}
        >
            {questions.map((question) => (
                <ListItem key={question._id} disablePadding>
                    <Card sx={{ width: "100%", my: 1 }} variant="outlined">
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {question.score !== undefined &&
                                    `${question.score} / `}
                                {question.grade} 分
                            </Typography>
                            <Typography variant="body1">
                                {question.question}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <FormControl disabled={disabled}>
                                <RadioGroup
                                    row
                                    name={question._id}
                                    defaultValue={question.answer}
                                >
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio size="small" />}
                                        label="对"
                                    />
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio size="small" />}
                                        label="错"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </CardActions>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
};

export const SingleChoiceQuestions = ({ questions, disabled }) => {
    if (!questions.length) return null;
    return (
        <List
            subheader={<ListSubheader>单选题</ListSubheader>}
            sx={{ width: "100%" }}
        >
            {questions.map((question) => (
                <ListItem key={question._id} disablePadding>
                    <Card sx={{ width: "100%", my: 1 }} variant="outlined">
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {question.score !== undefined &&
                                    `${question.score} / `}
                                {question.grade} 分
                            </Typography>
                            <Typography variant="body1">
                                {question.question}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <FormControl disabled={disabled}>
                                <RadioGroup
                                    row
                                    name={question._id}
                                    defaultValue={question.answer}
                                >
                                    <List dense>
                                        {question.options.map(
                                            (option, index) => (
                                                <ListItem key={index}>
                                                    <FormControlLabel
                                                        key={option}
                                                        value={index}
                                                        control={
                                                            <Radio size="small" />
                                                        }
                                                        label={option}
                                                    />
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </RadioGroup>
                            </FormControl>
                        </CardActions>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
};

export const MultipleChoiceQuestions = ({ questions, disabled }) => {
    if (!questions.length) return null;
    return (
        <List
            subheader={<ListSubheader>多选题</ListSubheader>}
            sx={{ width: "100%" }}
        >
            {questions.map((question) => (
                <ListItem key={question._id} disablePadding>
                    <Card sx={{ width: "100%", my: 1 }} variant="outlined">
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {question.score !== undefined &&
                                    `${question.score} / `}
                                {question.grade} 分
                            </Typography>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                评分方式:{" "}
                                {gradingTypes[question.gradingType]}
                                {question.gradingType === "rightMinusWrong" &&
                                    (question.allowNegativeGrade
                                        ? " (允许负数成绩)"
                                        : " (不允许负数成绩)")}
                            </Typography>
                            <Typography variant="body1">
                                {question.question}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <List dense>
                                {question.options.map((option, index) => (
                                    <ListItem key={index}>
                                        <FormControlLabel
                                            key={option}
                                            control={<Checkbox size="small" />}
                                            label={option}
                                            name={`${question._id}-${index}`}
                                            checked={question.answer?.includes(
                                                index
                                            )}
                                            disabled={disabled}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardActions>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
};

export const FillInBlankQuestions = ({ questions, disabled }) => {
    if (!questions.length) return null;
    return (
        <List
            subheader={<ListSubheader>填空题</ListSubheader>}
            sx={{ width: "100%" }}
        >
            {questions.map((question) => (
                <ListItem key={question._id} disablePadding>
                    <Card sx={{ width: "100%", my: 1 }} variant="outlined">
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {question.score !== undefined &&
                                    `${question.score} / `}
                                {question.grade} 分
                            </Typography>
                            <Box>{replaceBlanks(question, disabled)}</Box>
                        </CardContent>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
};

const replaceBlanks = (question, disabled = false) => {
    const re = /__+/g;
    const parts = [];
    let match;
    let lastIndex = 0;
    let i = 0;
    while ((match = re.exec(question.question))) {
        parts.push(
            <Typography variant="body1" component="span" key={lastIndex + 1}>
                {question.question.slice(lastIndex, match.index)}
            </Typography>
        );
        parts.push(
            <TextField
                key={match.index}
                size="small"
                variant="standard"
                name={`${question._id}-${i++}`}
                sx={{ mx: 1 }}
                defaultValue={question?.answer?.[i - 1]}
                disabled={disabled}
            />
        );
        lastIndex = match.index + match[0].length;
    }
    parts.push(
        <Typography variant="body1" component="span" key={lastIndex + 1}>
            {question.question.slice(lastIndex)}
        </Typography>
    );
    return parts;
};

export default Quiz;