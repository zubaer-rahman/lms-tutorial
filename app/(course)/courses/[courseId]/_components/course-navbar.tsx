import { Course } from "@prisma/client";

interface CourseNavbarProps {
  course: Course & {};
}
const CourseNavbar = () => {
  return <div>Course Navbar</div>;
};

export default CourseNavbar;
