export { includesValidator as includes };
declare function includesValidator({ list }: {
    list?: any[];
}): (value: any) => true | {
    list: any;
};
