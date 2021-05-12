import { Button, Result, Descriptions, Rate } from 'antd';
import {Link} from "umi";
import React from 'react';
import { connect } from 'umi';
import styles from './index.less';
import getErrorMessage from '@/services/error';

const SubmitResult = (props) => {
  const { data, dispatch, submitStatus } = props;

  if (!data) {
    return null;
  }

  const { courseId, courseName, teacherName, semester, title,
    content, recommendScore, workScore, examScore, contentScore} = data;

  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'addReviewForm/resetFormData',
      })

      dispatch({
        type: 'addReviewForm/switchStep',
        payload: 'courseInfo',
      });
    }
  };

  const fixFormData = () => {
    if (dispatch) {
      dispatch({
        type: 'addReviewForm/switchStep',
        payload: 'courseInfo',
      });
    }
  }

  const information = (
    <div className={styles.information}>
      <Descriptions title={"测评内容"} bordered column={2}
        labelStyle={{fontWeight: "bold"}}
      >
        <Descriptions.Item label="课程名" span={2}> {courseName}</Descriptions.Item>
        <Descriptions.Item label="教师名"> {teacherName}</Descriptions.Item>
        <Descriptions.Item label="学期"> {semester}</Descriptions.Item>
        <Descriptions.Item label="标题" span={2}>{title}</Descriptions.Item>
        <Descriptions.Item label="内容" span={2}>{content}</Descriptions.Item>
        <Descriptions.Item label="推荐分" span={2}>
          <Rate allowHalf defaultValue={recommendScore} disabled/>
        </Descriptions.Item>
        <Descriptions.Item label="课程内容" span={2}>
          <Rate allowHalf defaultValue={contentScore} disabled/>
        </Descriptions.Item>
        <Descriptions.Item label="工作量" span={2}>
          <Rate allowHalf defaultValue={workScore} disabled/>
        </Descriptions.Item>
        <Descriptions.Item label="考核/给分" span={2}>
          <Rate allowHalf defaultValue={examScore} disabled/>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const status = (submitStatus === "success" ? "success" : "error");

  const successExtra = (
    <>
      <Button type="primary" onClick={onFinish}>
        添加其他测评
      </Button>
      <Button>
        <Link to={`/course/${courseId}`}>查看测评</Link>
      </Button>
    </>
  );

  const errorExtra = (
    <>
      <Button type="primary" onClick={fixFormData}>
        修改测评
      </Button>
    </>
  )

  return (
    <Result
      status={status}
      title={getErrorMessage(status)}
      extra={status === 'success' ? successExtra : errorExtra}
      className={styles.result}
    >
      {information}
    </Result>
  );
};

export default connect(({ addReviewForm }) => ({
  data: addReviewForm.formData,
  submitStatus: addReviewForm.submitStatus,
}))(SubmitResult);
