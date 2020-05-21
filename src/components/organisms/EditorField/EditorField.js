import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextArea from '../../atoms/TextArea/TextArea';
import PreviewField from '../../atoms/PreviewField/PreviewField';

const StyledEditPreviewField = styled.div`
  flex: 1;
  display: flex;
`;

const StyledEditField = styled(TextArea)`
  /* flex: 1; */
  width: 50%;
  height: 100%;
  overflow: scroll;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    font-size: 14px;
    margin-bottom: 150px;
    height: ${({ height }) => height};
  }
`;

const StyledPreviewField = styled.div`
  /* flex: 1; */
  width: 50%;
  height: 100%;
  overflow: scroll;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    display: none;
  }
`;

const EditorField = ({ input, contentValueMutator }) => {
  // EditField height match content - no scroll
  const editFieldRef = useRef(null);
  const mobileEditorHeight = useRef('100vh');
  useEffect(() => {
    mobileEditorHeight.current = `${editFieldRef.current.scrollHeight}px`;
  });

  // Handle TAB key
  const handleTabKeyDown = (event) => {
    const { target, keyCode } = event;
    const { selectionStart, selectionEnd, value } = target;

    if (keyCode === 9) {
      event.preventDefault();
      const beforeCoursor = value.substring(0, selectionStart);
      const afterCoursor = value.substring(selectionEnd);
      target.value = `${beforeCoursor}  ${afterCoursor}`;
      target.selectionStart = selectionEnd + 2;
      target.selectionEnd = selectionEnd + 2;
      contentValueMutator('content', target.value);
    }
  };

  const handleScroll = () => {
    console.log(window.scrollTop);
  };

  return (
    <StyledEditPreviewField>
      <StyledEditField
        type="text"
        {...input}
        onKeyDown={handleTabKeyDown}
        ref={editFieldRef}
        height={mobileEditorHeight.current}
        onScroll={handleScroll}
      />
      <StyledPreviewField>
        <PreviewField />
      </StyledPreviewField>
    </StyledEditPreviewField>
  );
};

EditorField.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
  contentValueMutator: PropTypes.func.isRequired,
};

export default EditorField;
