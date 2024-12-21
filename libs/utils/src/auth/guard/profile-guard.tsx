import { shallowEqual, useSelector } from "react-redux";
import { getUserInfo } from "@gc-broadcast-web/redux/global/global.selector";
import { UserRole } from "@gc-broadcast-web/redux/constants/UserRole";
import { Features, ProfilePermission } from "@gc-broadcast-web/redux/constants/ProfilePermission";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useProfileGuard(feature: Features): ProfilePermission[Features] | null {

  const userInfo = useSelector(getUserInfo, shallowEqual);

  if (!userInfo) return null;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const permissions = userInfo?.branches?.[0]?.profile?.permissions;

  // console.log("::: permissions", permissions, userInfo?.branches);

  if (!permissions) return null;

  return permissions[feature] || null;
}

const Null = () => {
  const router = useRouter();

  useEffect(() => {
    const notFoundPath = '/not-found';
    router.replace(notFoundPath);
  }, []);

  return null;
}


const ProfileGuard = ({ children, feature, type = 'read' }: {
  children: React.ReactNode,
  feature: Features,
  type?: string
}) => {

  const userInfo = useSelector(getUserInfo, shallowEqual);

  const permissions = useProfileGuard(feature);

  if (!userInfo) return <Null />;

  if (userInfo?.type === UserRole.SUPER_ADMIN || userInfo?.type === UserRole.ADMIN)
    return children;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (permissions?.[type]) return children;

  return <Null />;
}

export default ProfileGuard;
