export { dateValidator as date };
declare function dateValidator({ before, after }: {
    before: any;
    after: any;
}): (value: any) => boolean;
