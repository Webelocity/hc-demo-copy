import { useQuery } from "@tanstack/react-query";
import {
  fetchStrapi,
  type StrapiEntity,
  type StrapiParams,
  type StrapiCareer,
  type StrapiTeamMember,
  StrapiReview,
} from "@/lib/strapi";

export function useStrapi<T extends StrapiEntity>(
  contentType: string,
  params?: StrapiParams
) {
  return useQuery({
    queryKey: [contentType, params],
    queryFn: () => fetchStrapi<T>(contentType, params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useCareers(params?: StrapiParams) {
  return useStrapi<StrapiCareer>("careers", {
    sort: "publishedAt:desc",
    ...params,
  });
}

export function useTeam(params?: StrapiParams) {
  return useStrapi<StrapiTeamMember>("teams", {
    ...params,
  });
}

export function useReviews(params?: StrapiParams) {
  return useStrapi<StrapiReview>("reviews", {
    ...params,
  });
}
