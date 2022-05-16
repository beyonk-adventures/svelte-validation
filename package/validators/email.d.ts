export { emailValidator as email };
declare function emailValidator(options?: {}): (value: any) => true | {
    email: any;
};
