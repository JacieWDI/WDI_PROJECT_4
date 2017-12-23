import React from 'react';

const DeleteCommentForm = ({ handleSubmit, handleChange, comment }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="body"
          placeholder="Add a comment.."
          onChange={handleChange}
          value={comment.body}
          className="form-control"
        />
      </div>
      <button className="save-button">Leave a comment</button>
    </form>
  );
};

export default DeleteCommentForm;
