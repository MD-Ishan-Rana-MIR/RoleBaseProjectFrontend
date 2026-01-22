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
    }),




    }),
})

export const { useProjectCreateMutation,useGetProjectsQuery } = projectApi
