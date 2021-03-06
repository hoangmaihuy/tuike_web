import request from 'umi-request';
import {getTuikeApi, postTuikeApi} from "@/services/requests";
import {TuikeCourseApi, TuikeTeacherApi, TuikeReviewApi} from "@/services/api";
import {getAllSchoolIds} from "@/consts/SchoolList";

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function getCoursesBySchool() {
  return getTuikeApi(TuikeCourseApi.GET_COURSES_BY_SCHOOL, {})
}

export async function searchCoursesByName(courseName) {
  return postTuikeApi(TuikeCourseApi.SEARCH_COURSES_BY_NAME, {
    course_name: courseName,
  })
}

export async function getTeacherList() {
  return getTuikeApi(TuikeTeacherApi.GET_TEACHER_LIST);
}

export async function getTeachersByCourse(courseId) {
  return postTuikeApi(TuikeTeacherApi.GET_TEACHERS_BY_COURSE, {
    course_id: courseId
  })
}

export async function addReview(data) {
  return postTuikeApi(TuikeReviewApi.ADD_REVIEW, data)
}
