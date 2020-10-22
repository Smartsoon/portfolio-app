import React, {useState} from "react";
import withApollo from "../../hoc/withApollo";
import {getDataFromTree} from "@apollo/client/react/ssr";

const Replier = ({isOpen, setIsReplyOpen, onSubmit, replyTo, hasTitle = true}) => {
    const [reply, setReply] = useState({title: "", content: ""});


    const handleChange = (e) => {
        const {name, value} = e.target;
        setReply({...reply, [name]: value})
    };

    const resetReplier = () => {
        setReply({title: "", content: ""})
    };

    const onHandleSubmitDone = () => {
        resetReplier();
    };

    return (
        <div className={`reply-controls ${isOpen ? 'is-open' : null}`}>
            <div className="reply-area">
                {replyTo &&
                <div className="reply-to">
                    Reply To: <span className="text ml-2">{replyTo}</span>
                </div>
                    ||
                <div className="reply-to pt-2">
                    <span className="text ml-2">{hasTitle ? "Create new topic" : null}</span>
                </div>
                }

                {
                    hasTitle &&
                    <div className="fj-editor-input">
                        <input
                            name="title"
                            value={reply.title}
                            onChange={handleChange}
                            placeholder="Topic title"
                            type="text"/>
                    </div>
                }

                <div className="fj-editor">
                    <div className="fj-editor-textarea-wrapper">
                                        <textarea
                                            name="content"
                                            value={reply.content}
                                            onChange={handleChange}
                                            placeholder="Type here">
                                        </textarea>
                    </div>
                    <div className="fj-editor-preview-wrapper">
                        <div className="preview">
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="submit-area">
                    <div className="send mr-auto">
                        <button
                            onClick={() => {
                                onSubmit(reply, onHandleSubmitDone);
                            }}
                            className="btn btn-main bg-blue py-2 ttu">Reply
                        </button>
                        <button className="btn py-2 ttu gray-10" onClick={() => setIsReplyOpen(false)}>Cancel</button>
                    </div>
                    <div>
                        <a className="btn py-2 ttu gray-10">hide preview</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default withApollo(Replier, {getDataFromTree});
