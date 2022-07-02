const Part = ({course}) => <p>{course.name}{" "}{course.exercises}</p>
const Content = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <div>
            {parts.map((part) => <Part key={part.id} course={part}/>)}
            <b>total of {total} exercises</b>
        </div>
    )
}

export default Content