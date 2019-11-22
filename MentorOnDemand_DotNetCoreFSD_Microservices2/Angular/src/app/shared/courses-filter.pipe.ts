import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'courseFilter'
})
export class CourseFilterPipe implements PipeTransform {
    transform(courses: any[], searchTerm: string): any {
        if (!courses || !searchTerm) {
            return courses;
        }
        console.log(courses);
        return courses.filter(course =>
            course.value.courseName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
