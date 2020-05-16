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
  flex: 1;
  width: 50%;
  margin-bottom: 150px;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    height: 100vh;
    font-size: 14px;
  }
`;

const StyledPreviewField = styled.div`
  flex: 1;
  width: 50%;
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    display: none;
  }
`;

const EditorField = ({ input, contentValueMutator }) => {
  const editFieldRef = useRef(null);
  useEffect(() => {
    editFieldRef.current.style.height = `${editFieldRef.current.scrollHeight}px`;
  });

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

  return (
    <StyledEditPreviewField>
      <StyledEditField type="text" {...input} onKeyDown={handleTabKeyDown} ref={editFieldRef} />
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
