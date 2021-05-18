import {getCourseInfo} from './service';
import {Result} from '@/services/consts';
import SchoolList from "@/consts/school";
import CourseType from "@/consts/courseType";
import {getTeachersByCourse} from "@/pages/AddReview/service";
import { getCourseReviews, interactReview } from './service';

const Model = {
  namespace: 'courseDetail',
  state: {
    status: undefined,
    courseInfo: {},
    teacherList: [],
    courseReviews: [],
    reviewParams: {
      teacherId: 0,
      semester: 'all',
      sortedBy: 'latest',
    },
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
    }
  },
  effects: {
    *fetchCourseInfo({payload}, { call, put }) {
      const {result, reply} = yield call(getCourseInfo, payload);
      yield put({
        type: 'saveCourseInfo',
        payload: {
          status: result,
          courseInfo: reply,
        },
      });
    },

    *fetchTeacherList({payload}, {call, put}) {
      const {result, reply} = yield call(getTeachersByCourse, payload);
      if (result === Result.SUCCESS) {
        yield put({
          type: 'saveTeacherList',
          payload: reply.teachers,
        })
      }
    },
    *fetchCourseReviews({payload}, { call, put }) {
      const { courseId, pagination, params } = payload;
      const { result, reply } = yield call(getCourseReviews, courseId, pagination, params)
      if (result === Result.SUCCESS) {
        yield put({
          type: 'saveCourseReviews',
          payload: reply,
        })
      }
    },
    *interactReview({payload}, { call, put }) {
      const {reviewId, action} = payload;
      yield put({
        type: 'changeReviewInteract',
        payload,
      })
      yield call(interactReview, reviewId, action);
    }
  },
  reducers: {
    resetState(state) {
      return {
        status: undefined,
        courseInfo: {},
        teacherList: [],
        courseReviews: [],
        reviewParams: {
          teacherId: 0,
          semester: 'all',
          sortedBy: 'latest',
        },
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
        }
      }
    },

    saveCourseInfo(state, {payload}) {
      const {status, courseInfo} = payload;
      if (status !== Result.SUCCESS)
        return {
          ...state,
          status,
          courseInfo: {},
        }

      return {
        ...state,
        status,
        courseInfo: {
          id: courseInfo.course_id,
          name: courseInfo.name,
          courseNo: courseInfo.course_no,
          type: courseInfo.type,
          typeName: CourseType[courseInfo.type],
          schoolName: SchoolList[courseInfo.school_id],
          credit: courseInfo.credit,
          reviewCount: courseInfo.review_count,
          recommendScore: courseInfo.recommend_score.toFixed(2),
          contentScore: courseInfo.content_score.toFixed(2),
          workScore: courseInfo.work_score.toFixed(2),
          examScore: courseInfo.exam_score.toFixed(2),
        },
      }
    },

    saveTeacherList(state, {payload}) {
      return {...state, teacherList: payload}
    },

    saveCourseReviews(state, {payload}) {
      return {
        ...state,
        courseReviews: payload.reviews,
        pagination: {
          ...state.pagination,
          total: payload.total,
        }
      }
    },

    savePagination(state, {payload}) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...payload
        }
      }
    },

    changeReviewParams(state, {payload}) {
      return {
        ...state,
        reviewParams: {
          ...state.reviewParams,
          ...payload
        }
      }
    },

    changeReviewInteract(state, {payload}) {
      const {userId, reviewId, action} = payload;
      const newCourseReviews =  state.courseReviews.map((review) => {
        if (review.id !== reviewId)
          return review;
        let newReview = {
          ...review
        }
        if (action === "like") {
          newReview.likes.push(userId);
          newReview.dislikes = newReview.dislikes.filter((id) => (id !== userId));
        } else {
          newReview.dislikes.push(userId);
          newReview.likes = newReview.likes.filter((id) => (id !== userId));
        }
        return newReview;
      })
      return {
        ...state,
        courseReviews: newCourseReviews,
      }
    },
  },
};
export default Model;
