import { aadhaarGoal } from './aadhaar'
import { panCardGoal } from './pan-card'
import { passportGoal } from './passport'
import { voterIdGoal } from './voter-id'
import { drivingLicenceGoal } from './driving-licence'
import { visaGoal } from './visa'
import { jobApplicationGoal } from './job-application'
import { resumePhotoGoal } from './resume-photo'

export const idDocumentGoals = Object.freeze([
  aadhaarGoal,
  panCardGoal,
  passportGoal,
  voterIdGoal,
  drivingLicenceGoal,
  visaGoal,
  jobApplicationGoal,
  resumePhotoGoal,
])
