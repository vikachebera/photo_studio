// @ts-ignore
import classes from "./styles/PrivacyPolicy.module.css";
import {useEffect, useState} from "react";
import Markdown from 'react-markdown';

export default function PrivacyPolicy() {
    const [content, setContent] = useState('');
    useEffect(() => {
        fetch('/privacy-policy.md')
            .then(res => res.text())
            .then(text => setContent(text));
    })
    return (
        <div className={classes.privacy_container}>
            <Markdown>{content}</Markdown>
        </div>
    )
}