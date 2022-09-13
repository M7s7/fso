const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ parts }) => {
  const sum = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0)

  return (
  <p>
    <b>total of {sum} exercises</b>
  </p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
    <>
      {parts.map(part => <Part part={part} key={part.id} />)}
    </>

const Course = ({ course }) => 
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>

export default Course