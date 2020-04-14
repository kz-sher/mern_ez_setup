const OnlyIf = (props) => {
    const condition = props.condition || false;
    
    return condition? props.children: null;
};

export default OnlyIf;