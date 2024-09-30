import { createSlice } from "@reduxjs/toolkit";

export const INTENTED_LEARNERS = "Intended learners";
export const CURRICULUM = "Curriculum";
export const COURSE_LANDING_PAGE = "Course landing page";
export const PRICING = "Pricing";
export const COURSE_MESSAGES = "Course announcements";

const setChangedFields = (state, property) => {
  if (!state.changedFields.includes(property)) {
    state.changedFields = [...state.changedFields, property];
  }
};

const setIntentedLearnerArray = (state, action, property) => {
  const { id, value } = action.payload;

  if (!value.trim().length) {
    state[`${property}`] = state[`${property}`].filter((obj) => obj.id !== id);
    return;
  }

  if (state[`${property}`].some((obj) => obj.id === id)) {
    state[`${property}`] = state[`${property}`].map((obj) =>
      obj.id === id ? { id, value } : obj,
    );
  } else {
    state[`${property}`] = [...state[`${property}`], { id, value }];
  }

  // if (!state.changedFields.includes(property)) {
  //   state.changedFields = [...state.changedFields, property];
  // }
  setChangedFields(state, property);
};

const initialState = {
  activeSidebarLink: INTENTED_LEARNERS,
  intented_learners: [],
  outcomes: [],
  requirements: [],
  changedFields: [],
  changedSections: false,
  changedContents: { changed: false, sections: [] },
  changedDescription: false,
  language: null,
  skillLevel: null,
  category: null,
  description: "",
  name: "",
  photo: null,
  content: null,
  sections: [],
  contents: [],
  showSidebar: true,
  previousContent: null,
  nextContent: null,
  changes: false,
};

const manageCourseSlice = createSlice({
  name: "manageCourse",
  initialState,
  reducers: {
    setActiveSidebarLink(state, action) {
      state.activeSidebarLink = action.payload;
    },
    setNewImage(state, action) {
      state.photo = action.payload;
      setChangedFields(state, "photo");
    },
    setNewContent(state, action) {
      state.content = action.payload;
    },
    setInitialIntentedLearnerData(state, action) {
      state.outcomes = action.payload.outcomes;
      state.requirements = action.payload.requirements;
      state.intented_learners = action.payload.intented_learners;
    },
    setInitialCurriculumData(state, action) {
      const contents = [];

      for (const section of action.payload.sections) {
        contents.push({ section_id: section.id, contents: section.contents });
        delete section.contents;
      }
      state.contents = contents;
      state.sections = action.payload.sections;
    },
    setInitialLandingPageData(state, action) {
      const { name, description, category, skillLevel, language } =
        action.payload;
      state.name = name;
      state.description = description;
      state.category = category;
      state.skillLevel = skillLevel;
      state.language = language;
    },
    setObjectives(state, action) {
      setIntentedLearnerArray(state, action, "outcomes");
    },
    setRequirements(state, action) {
      setIntentedLearnerArray(state, action, "requirements");
    },
    setIntentedLearners(state, action) {
      setIntentedLearnerArray(state, action, "intented_learners");
    },
    setHappenedChanges(state, action) {
      state.changes = action.payload;
    },
    setCourseCategory(state, action) {
      state.category = action.payload;
      setChangedFields(state, "category");
    },
    setCourseSkillLevel(state, action) {
      state.skillLevel = action.payload;
      setChangedFields(state, "skillLevel");
    },
    setCourseLanguage(state, action) {
      state.language = action.payload;
      setChangedFields(state, "language");
    },
    setChangeDescription(state) {
      state.changedDescription = true;
    },
    setCourseDescription(state, action) {
      state.description = action.payload;
      if (state.changedDescription) {
        setChangedFields(state, "description");
      }
    },
    setCourseName(state, action) {
      state.name = action.payload;
      setChangedFields(state, "name");
    },
    setSections(state, action) {
      for (const section of action.payload) {
        delete section.contents;
      }
      state.sections = action.payload;
      state.changedSections = true;
    },
    setContents(state, action) {
      state.contents = action.payload.contents;
      state.changedContents = {
        changed: true,
        sections: [
          ...state.changedContents.sections,
          action.payload.section_id,
        ],
      };
    },
    setShowSidebar(state, action) {
      state.showSidebar = action.payload;
    },
    setPreviousContent(state, action) {
      state.previousContent = action.payload;
    },
    setNextContent(state, action) {
      state.nextContent = action.payload;
    },
    resetManageCourseData() {
      return initialState;
    },
  },
});

export const {
  setActiveSidebarLink,
  setObjectives,
  setInitialIntentedLearnerData,
  setRequirements,
  resetManageCourseData,
  setIntentedLearners,
  setHappenedChanges,
  setCourseCategory,
  setCourseSkillLevel,
  setCourseLanguage,
  setCourseDescription,
  setCourseName,
  setInitialLandingPageData,
  setNewImage,
  setSections,
  setInitialCurriculumData,
  setChangeDescription,
  setContents,
  setNewContent,
  setShowSidebar,
  setPreviousContent,
  setNextContent,
} = manageCourseSlice.actions;

export default manageCourseSlice.reducer;
