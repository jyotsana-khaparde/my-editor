import {
  EditorState,
  Modifier,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import React, { useEffect, useState } from "react";

import Button from "./Button";
import { Editor } from "react-draft-wysiwyg";
import Title from "./Title";

// Define custom styles for RED (and potentially other styles)
const customStyleMap = {
  RED: {
    color: "red", // Define red color for RED style
  },
  UNDERLINE: {
    textDecoration: "underline",
    color: "black",
  },
};

const EditorComponent = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedState = localStorage.getItem("editorState");
    return savedState
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedState)))
      : EditorState.createEmpty();
  });

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem("editorState", JSON.stringify(rawContentState));
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handlePrefixFormatting = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const text = block.getText();
    let newEditorState = editorState;

    // Check if the block starts with "# " for header-one
    if (text.startsWith("# ")) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 2,
        }),
        text.slice(2) // Remove "# "
      );
      newEditorState = EditorState.push(
        newEditorState,
        newContentState,
        "change-block-type"
      );
      newEditorState = RichUtils.toggleBlockType(newEditorState, "header-one");
    } else if (text.startsWith("* ")) {
      // Apply bold inline style
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 2,
        }),
        text.slice(2) // Remove "* "
      );
      newEditorState = EditorState.push(
        newEditorState,
        newContentState,
        "change-inline-style"
      );
      newEditorState = RichUtils.toggleInlineStyle(newEditorState, "BOLD");
    } else if (text.startsWith("** ")) {
      // Apply red inline style
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 3,
        }),
        text.slice(3) // Remove "** "
      );
      newEditorState = EditorState.push(
        newEditorState,
        newContentState,
        "change-inline-style"
      );
      newEditorState = RichUtils.toggleInlineStyle(newEditorState, "RED");
    } else if (text.startsWith("*** ")) {
      // Apply underline inline style
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 4,
        }),
        text.slice(4) // Remove "*** "
      );
      newEditorState = EditorState.push(
        newEditorState,
        newContentState,
        "change-inline-style"
      );
      newEditorState = RichUtils.toggleInlineStyle(newEditorState, "UNDERLINE");
    }
    return newEditorState;
  };

  useEffect(() => {
    // Ensure that the styles are reset for the next block
    const newEditorState = handlePrefixFormatting(editorState);
    setEditorState(newEditorState);
  }, [editorState]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Title />
        <Button onSave={handleSave} />
      </div>
      <div
        style={{ border: "1px solid #ddd", padding: "10px", height: "50vh" }}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbarHidden={true}
          customStyleMap={customStyleMap} // Apply custom styles here
        />
      </div>
    </div>
  );
};

export default EditorComponent;
