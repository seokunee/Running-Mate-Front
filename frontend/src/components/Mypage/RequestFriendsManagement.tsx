import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { Button, Loading } from '@nextui-org/react';
import Swal from 'sweetalert2';
import PeopleList from '../../common/components/PeopleList';
import FriendService from '../../lib/api/friendService';
import { useSelector } from '../../modules';
import { friendActions } from '../../modules/friend';

const RequestFriendsManagement = () => {
  const history = useHistory();
  const { token, requestFriendFetch } = useSelector((state) => ({
    token: state.signIn.token,
    requestFriendFetch: state.friend.requestFriendFetch,
  }));
  const dispatch = useDispatch();
  const [requestList, setRequestList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getRequestFriends = async () => {
    try {
      const { requestFriendList } = await new FriendService().getRequestFriend(
        token
      );
      setRequestList(requestFriendList);
    } catch {
      Swal.fire({
        toast: true,
        title: '친구 정보 불러오기 실패.',
        text: '친구 정보를 불러오는데 실패하였습니다.',
        icon: 'error',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  const goManageRequestFriends = () => {
    history.push('/mypage/friends/list');
  };

  const permitFriend = (userNickName: string) => {
    dispatch(
      friendActions.requestFriend({
        token,
        requesteeName: userNickName,
        requestRole: 'permit',
      })
    );
    setLoading(true);
    getRequestFriends();
    setLoading(false);
  };

  const dismissFriend = (userNickName: string) => {
    dispatch(
      friendActions.requestFriend({
        token,
        requesteeName: userNickName,
        requestRole: 'dismiss',
      })
    );
    setLoading(true);
    getRequestFriends();
    setLoading(false);
  };

  //* useEffects
  useEffect(() => {
    setLoading(true);
    getRequestFriends();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (requestFriendFetch === 'Success')
      dispatch(friendActions.initRequestFriendFetch());
    if (requestFriendFetch === 'Failure') {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: '죄송합니다. 요청에 실패하였습니다.',
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
      dispatch(friendActions.initRequestFriendFetch());
    }
  }, [requestFriendFetch]);

  return (
    <div className="mx-auto my-0 py-10 px-20 flex flex-col space-y-10 justify-center">
      <div className="w-full flex space-x-3 justify-center">
        <div>
          <Button
            bordered
            auto
            color="secondary"
            onClick={goManageRequestFriends}
          >
            친구목록
          </Button>
        </div>
        <div>
          <Button bordered auto color="secondary">
            친구요청
          </Button>
        </div>
      </div>
      {loading && (
        <div>
          <Loading type="points" color="secondart" />
        </div>
      )}
      {requestList.length !== 0 ? (
        <div className="border-2 border-purple rounded-lg flex flex-col divide-y divide-purple">
          {requestList.map((friend) => (
            <PeopleList key={v4()} userNickName={friend}>
              <div className="w-30">
                <Button
                  auto
                  rounded
                  color="secondary"
                  onClick={() => permitFriend(friend)}
                >
                  수락
                </Button>
              </div>
              <div className="w-30">
                <Button
                  auto
                  rounded
                  color="secondary"
                  onClick={() => dismissFriend(friend)}
                >
                  거절
                </Button>
              </div>
            </PeopleList>
          ))}
        </div>
      ) : (
        <h1 className="text-2xl">친구요청 목록이 비어있습니다.</h1>
      )}
    </div>
  );
};

export default RequestFriendsManagement;
