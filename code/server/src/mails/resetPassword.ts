export const getSubject = (): string => 'Request to reset your password at Household App';

export const getHTML = (data: any): string => `
  <div>
    <div>TO RESET YOUR PASSWORD CLICK THE FOLLOWING LINK</div>
    <div>${data.resetLink}</div>
  </div>
`;
