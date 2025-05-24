'use client';

import styled from 'styled-components';

export const DosisHeader = styled.header`
  font-family: var(--font-dosis-sans), Arial, sans-serif;
`;

export default function Header() {
  return (
    <DosisHeader className='bg-[#548acb] text-white px-8 py-3 font-semibold text-2xl tracking-wider font-sans'>
      SHOPPING LIST
    </DosisHeader>
  );
}
