export const isTeacher = (userId: string | null | undefined) => {
return userId === process.env.NEXT_PUBLIC_TEACHER_ID
}