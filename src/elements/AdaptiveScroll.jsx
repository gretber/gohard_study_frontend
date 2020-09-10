// Core
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { throttle } from 'lodash';

const scrollStyles = (heightDiff, minHeight) => {
  const newScrollContainerHeight = `calc(100% - ${heightDiff + 2}px)`;

  return css`
        overflow-x: hidden;
        overflow-y: auto;
        height:    ${newScrollContainerHeight};
        min-height: ${minHeight ? newScrollContainerHeight : 'auto'};
    `;
};

// Styles
const ScrollContainer = styled.section`
    ${({ disableOnMobile, heightDiff, minHeight }) => {
    const stylesResult = scrollStyles(heightDiff, minHeight);

    if (disableOnMobile) {
      return css`
        @media (min-width: 1024px) {
            ${stylesResult};
        }
      `;
    }

    return stylesResult;
  }};
`;

export const AdaptiveScroll = ({
  children, refs, minHeight, backgroundColor, disableOnMobile,
}) => {
  const [heightDiff, setHeightDiff] = useState(0);

  const resizeHandler = throttle(() => {
    const clientHeightSumma = refs.reduce(
      (acc, ref) => ref.current ? acc + ref.current.clientHeight : acc, 0,
    );

    heightDiff !== clientHeightSumma && void setHeightDiff(clientHeightSumma);
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []); // eslint-disable-line

  useEffect(() => {
    resizeHandler();
  });

  return (
    <ScrollContainer
      disableOnMobile={disableOnMobile}
      heightDiff={heightDiff}
      minHeight={minHeight}
      style={{ backgroundColor }}
    >
      {children}
    </ScrollContainer>
  );
};
