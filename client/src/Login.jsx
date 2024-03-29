import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

import { apiRoutes } from "./util";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(undefined);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage(undefined);

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");

        fetch(apiRoutes.login, {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        })
            .then((res) => {
                if (res.ok) navigate("/", { replace: true });
                else setMessage("用户名或密码错误");
            })
            .catch((error) => setMessage("未知错误！请稍后再试"))
            .finally(() => setLoading(false));
    };

    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            maxWidth={400}
            mx="auto"
        >
            <Typography variant="h4" component="h1" gutterBottom>
                欢迎来到OnlineJudge
            </Typography>
            <Box component="form" onSubmit={handleSubmit} width="100%">
                <TextField
                    name="username"
                    variant="standard"
                    fullWidth
                    required
                    label="用户名"
                    autoFocus
                />
                <TextField
                    name="password"
                    type="password"
                    variant="standard"
                    fullWidth
                    required
                    label="密码"
                />
                <Box sx={{ width: "100%" }}>
                    {message && (
                        <Typography variant="body2" color="error">
                            {message}
                        </Typography>
                    )}
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ my: 2 }}
                >
                    {loading ? <CircularProgress size={24} /> : "登录"}
                </Button>
            </Box>
        </Box>
    );
};

export default Login;