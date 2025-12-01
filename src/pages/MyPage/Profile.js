import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Stack,
  Typography,
  Divider,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { showNotification } from "../../features/ui/notificationSlice";
import { login } from "../../features/auth/authSlice";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 수정 가능한 필드만 폼 상태로 관리
  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: "",
    zipcode: "",
    addr: "",
    detail_addr: "",
  });

  // 최근 서버/리덕스 기준 값
  const initialRef = useRef(form);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // 소셜 여부는 Redux user.provider 기준
  const isSocial = user?.provider && user.provider !== "LOCAL";

  // 페이지 진입 시: 서버에서 "나머지 필드" 채움
  useEffect(() => {
    let alive = true;

    // 리덕스 값 반영(새로고침 깜빡임 방지)
    const primeFromRedux = () => {
      const primed = {
        ...form,
        name: user?.name ?? "",
      };
      initialRef.current = primed;
      if (alive) setForm(primed);
    };

    primeFromRedux();

    (async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/user`); // JWT로 본인 식별
        const u = data?.user ?? {};
        if (!alive) return;

        const merged = {
          ...initialRef.current,
          phone: u.phone ?? "",
          zipcode: u.zipcode ?? "",
          addr: u.addr ?? "",
          detail_addr: u.detail_addr ?? "",
        };
        initialRef.current = merged;
        setForm(merged);
      } catch {
        // 조용히 실패 처리
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const startEdit = () => setIsEditing(true);
  const cancelEdit = () => {
    setForm(initialRef.current);
    setIsEditing(false);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        zipcode: form.zipcode,
        addr: form.addr,
        detail_addr: form.detail_addr,
      };

      const res = await axios.put(`${baseURL}/api/user`, payload);
      const serverUser = res?.data?.user ?? {};

      const updated = {
        ...initialRef.current,
        ...serverUser,
        ...payload,
      };

      initialRef.current = updated;
      setForm(updated);

      // (선택) 이름이 바뀌면 네비바 즉시 반영
      dispatch(login({ ...(user ?? {}), name: updated.name }));

      dispatch(
        showNotification({
          message: "프로필이 저장되었습니다.",
          severity: "success",
        })
      );
      setIsEditing(false); // 저장 후 수정 모드 해제 → 비밀번호 버튼 조건에도 반영됨
    } catch (err) {
      dispatch(
        showNotification({
          message:
            err?.response?.data?.detail ||
            err?.response?.data?.message ||
            "저장 중 오류가 발생했습니다.",
          severity: "error",
        })
      );
    }
  };

  // 읽기/편집 토글
  const roOrEdit = () =>
    !isEditing ? { InputProps: { readOnly: true } } : {};

  if (loading) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        불러오는 중…
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6">회원정보 조회/수정</Typography>
        {!isEditing ? (
          <Button variant="outlined" onClick={startEdit}>
            변경
          </Button>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={cancelEdit}>
              취소
            </Button>
            <Button variant="contained" onClick={save}>
              저장
            </Button>
          </Stack>
        )}
      </Stack>

      <Box component="form" onSubmit={save}>
        <Stack spacing={2} maxWidth={520}>
          {/* 이름: 편집 가능 */}
          <TextField
            label="이름"
            name="name"
            value={form.name}
            onChange={onChange}
            {...roOrEdit()}
          />

          {/* 이메일: 절대값, 항상 읽기 전용 */}
          <TextField
            label="이메일"
            value={user?.email ?? ""}
            InputProps={{ readOnly: true }}
          />

          {/* 가입 플랫폼: 절대값, 라벨이 항상 위에 있도록 shrink 강제 */}
          <TextField
            label="가입 플랫폼"
            value={user?.provider ?? ""}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }} // ← 라벨이 안으로 내려오는 문제 해결
          />

          <Divider sx={{ my: 1.5 }} />

          {/* 수정 가능한 나머지 필드 */}
          <TextField
            label="휴대폰 번호"
            name="phone"
            value={form.phone}
            onChange={onChange}
            {...roOrEdit()}
          />
          <TextField
            label="우편번호"
            name="zipcode"
            value={form.zipcode}
            onChange={onChange}
            {...roOrEdit()}
          />
          <TextField
            label="주소"
            name="addr"
            value={form.addr}
            onChange={onChange}
            {...roOrEdit()}
          />
          <TextField
            label="상세 주소"
            name="detail_addr"
            value={form.detail_addr}
            onChange={onChange}
            {...roOrEdit()}
          />

          {/* 로컬 계정 + 조회 모드일 때만 비밀번호 변경 버튼 노출 */}
          {!isSocial && !isEditing && (
            <Button type="button" variant="outlined">
              비밀번호 변경
            </Button>
          )}
        </Stack>
      </Box>
    </Paper>
  );
}
