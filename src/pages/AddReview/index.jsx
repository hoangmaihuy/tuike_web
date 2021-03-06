import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import CourseInfoForm from './components/CourseInfoForm';
import ReviewForm from './components/ReviewForm';
import SubmitResult from './components/Result'
import styles from './style.less';

const { Step } = Steps;

const getCurrentStepAndComponent = (current) => {
  switch (current) {
    case 'review':
      return {
        step: 1,
        component: <ReviewForm />
      };

    case 'result':
      return {
        step: 2,
        component: <SubmitResult />
      }

    case 'courseInfo':
    default:
      return {
        step: 0,
        component: <CourseInfoForm />,
      };
  }
};

const AddReviewForm = ({ current }) => {
  const [stepComponent, setStepComponent] = useState(<CourseInfoForm />);
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);
  return (
    <PageContainer>
      <Card bordered={false}>
        <>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="课程信息" />
            <Step title="测评内容" />
            <Step title="完成" />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageContainer>
  );
};

export default connect(({ addReviewForm }) => ({
  current: addReviewForm.current,
}))(AddReviewForm);
