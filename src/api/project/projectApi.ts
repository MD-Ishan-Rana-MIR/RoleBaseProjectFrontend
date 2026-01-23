import type { Project } from "../../utility/type/projectType";
import { baseApi } from "../base-api/baseApi"
interface ProjectsResponse {
  data: Project[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        projectCreate: builder.mutation({
            query: (data) => ({
                url: `/projects`,
                method: "POST",
                body: data
            }),
            invalidatesTags : ["Project"]
        }),
        
        getProjects: builder.query<ProjectsResponse, { page: number; limit: number; search?: string }>({
            query: ({ page, limit, search }) => ({
            url: "/projects",
            params: { page, limit, search },
      }),
      providesTags : ["Project"]
    }),

    ProjectUpdate : builder.mutation({
      query : ({id,data})=>({
        url : `/project-update/${id}`,
        method : "PUT",
        body : data
      }),
      invalidatesTags : ["Project"]
    }),

    ProjectDelete : builder.mutation({
      query : (id)=>({
        url : `/projects/${id}`,
        method : "POST",
        
      }),
      invalidatesTags : ["Project"]
    })




    }),
})

export const { useProjectCreateMutation,useGetProjectsQuery,useProjectUpdateMutation , useProjectDeleteMutation} = projectApi
