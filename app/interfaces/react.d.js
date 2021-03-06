// // workaround for https://github.com/facebook/flow/issues/239
//
// type ReactPropsCheckType = (
//   props:any,
//   propName: string,
//   componentName: string,
//   href?: string) => ?Error;
//
// type ReactPropsChainableTypeChecker = {
//   isRequired: ReactPropsCheckType;
//   (props:any, propName: string, componentName: string, href?: string): ?Error;
// };
//
// type ReactPropTypes = {
//   array: ReactPropsChainableTypeChecker;
//   bool: ReactPropsChainableTypeChecker;
//   func: ReactPropsChainableTypeChecker;
//   number: ReactPropsChainableTypeChecker;
//   object: ReactPropsChainableTypeChecker;
//   string: ReactPropsChainableTypeChecker;
//
//   any: ReactPropsChainableTypeChecker;
//   arrayOf: (typeChecker: ReactPropsCheckType) => ReactPropsChainableTypeChecker;
//   element: ReactPropsChainableTypeChecker;
//   instanceOf: (expectedClass: any) => ReactPropsChainableTypeChecker;
//   node: ReactPropsChainableTypeChecker;
//   objectOf: (typeChecker: ReactPropsCheckType) => ReactPropsChainableTypeChecker;
//   oneOf: (expectedValues: Array) => ReactPropsChainableTypeChecker;
//   oneOfType: (arrayOfTypeCheckers: Array<ReactPropsCheckType>) => ReactPropsChainableTypeChecker;
//   shape: (shapeTypes: { [key: string]: ReactPropsCheckType }) => ReactPropsChainableTypeChecker;
// }
//
// declare module "react.js" {
//
//   declare var Children: any;
//   declare var DOM: any;
//   declare var PropTypes: ReactPropTypes;
//
//   declare function initializeTouchEvents(shouldUseTouch: boolean): void;
//
//   declare function createClass(spec: any): ReactClass<any,any,any>; // compiler magic
//
//   //    declare function createElement(name: string, props?: any, children?: any): any;
//   declare function createElement<A,P,S>(name: ReactClass<A,P,S>, props: A & $Shape<P>, children?: any): ReactElement<A,P,S>;
//
//   declare function createFactory(name: string): (props?: any, children?: any) => any;
//   declare function createFactory<A,P,S>(name: ReactClass<A,P,S>): (props: A, children?: any) => ReactElement<A,P,S>;
//
//   declare function constructAndRenderComponent(name: string, props: any, container: any): any;
//   declare function constructAndRenderComponent<A,P,S>(name: ReactClass<A,P,S>, props: A, container: any): ReactComponent<A,P,S>;
//
//   declare function constructAndRenderComponentByID(name: string, props: any, id: string): any;
//   declare function constructAndRenderComponentByID<A,P,S>(name: ReactClass<A,P,S>, props: A, id: string): ReactComponent<A,P,S>;
//
//   declare function render<A,P,S>(element: ReactElement<A,P,S>, container: any): ReactComponent<A,P,S>;
//
//   declare function renderToString(element: ReactElement<any,any,any>): string;
//   declare function renderToStaticMarkup(element: ReactElement<any,any,any>): string;
//
//   declare function unmountComponentAtNode(container: any): boolean;
//
//   declare function isValidElement(element: any): boolean;
//   declare function withContext(context: any, callback: () => void): any;
// }
