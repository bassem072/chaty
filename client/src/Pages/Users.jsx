import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import NoChatSelected from "../Components/ui/Shared/NoChatSelected";
import UsersSearch from "../Components/ui/Users/UsersSearch";
import UserProfile from "../Components/ui/Users/UserProfile";
import { getUserService } from "../services/user.service";
import Loading from "../Components/ui/Shared/Loading";
import UserNotFound from "../Components/ui/Users/UserNotFound";

export default function Users() {
  const { t } = useTranslation("users");
  let { id } = useParams();
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(id ? true : false);

  const getUser = (keyword) => {
    getUserService(id)
      .then((data) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center overflow-hidden">
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      <UsersSearch searchText={searchText} setSearchText={setSearchText} />
      {id ? (
        loading ? (
          <Loading />
        ) : user ? (
          <UserProfile user={user} />
        ) : (
          <UserNotFound />
        )
      ) : (
        <NoChatSelected showInMobile={true} />
      )}
    </div>
  );
}
