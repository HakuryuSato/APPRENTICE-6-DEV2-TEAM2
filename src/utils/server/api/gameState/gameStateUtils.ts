import type { GameState, GameStateRequest } from '@/types/GameState';
import type { UserStatus } from '@/types/UserStatus';
import { responseWithError } from '../../responseWithError';
import { kvSet, kvGet } from '@/utils/server/vercelKVHandler';
import { targetThemes } from './targetThemes';

// GameStateRequestの処理を行う関数  -------------------------------------------------
export async function handleGameStateRequest (
  request: GameStateRequest
): Promise<GameState | Response> {
  const { gameId, gameStateRequestType, userStatus } = request;

  // gameIdまたはgameStateRequestTypeがなければエラー
  if (!gameId || !gameStateRequestType) {
    return responseWithError('Missing gameId', 400);
  }

  // gameStateの取得
  let gameState = (await kvGet(gameId)) as GameState;

  // create以外でGameStateが存在しないならエラー
  if (!gameState && gameStateRequestType !== 'create') {
    return responseWithError('Missing GameState', 400);
  }

  // RequestTypeに応じて処理
  switch (gameStateRequestType) {
    // 作成
    case 'create': {
      // 既にgameStateが存在するならば終了
      if (gameState) break;

      // 存在しないならば作成
      gameState = createGameState(gameId, userStatus);
      addUserToGameState(gameState, userStatus);
      await kvSet(gameId, gameState);
      break;
    }

    // ユーザーの追加
    case 'enter': {
      // userIdまたはuserNameがなければエラー
      if (!userStatus?.userId || !userStatus?.userName) {
        return responseWithError('playerInfo not found', 404);
      }

      addUserToGameState(gameState, userStatus);
      handleGoToNextPhase(gameState);
      break;
    }

    // ユーザーの準備完了
    case 'ready': {
      // GameStateが存在しないなら終了
      if (!gameState) break;

      if (userStatus) {
        const user = gameState.users.find(
          user => user.userId === userStatus.userId
        );
        if (user) {
          user.isReady = userStatus.isReady;
          handleGoToNextPhase(gameState);
        }
      }
      break;
    }
  }

  // 最後に変更内容を反映したGameStateを返す
  const updatedGameState = await kvGet(gameId);
  if (!updatedGameState) {
    return createGameState(gameId, userStatus);
  }
  return updatedGameState as GameState;
}

// 全員が準備完了になったら5秒後にisReadyを全てfalseにする関数  -------------------------------------------------
// 注:Vercelではタイムアウト10秒のため待機時間を長く設定しすぎないこと
export async function handleGoToNextPhase (gameState: GameState) {
  // すでにtrueなら何もしない
  if (gameState.isAllUsersReady) return;

  // 今回の更新で全員が準備完了したなら実行
  if (!gameState.isAllUsersReady && getAllReady(gameState.users)) {
    console.log('Vercelデバッグ用:gameState.ts全員準備完了');
    // isAllUsersReady を true にして一時保存
    gameState.isAllUsersReady = true;
    gameState.round += 1;
    await handleSetGameState(gameState);

    // 全ユーザーが次のフェーズへ移れるよう5秒待機
    // *最大インスタンス数 = ユーザー数
    console.log('Vercelデバッグ用:gameState.ts待機開始');
    await delayMs(5000);
    console.log('Vercelデバッグ用:gameState.ts待機終了');

    // isAllUsersReady・全ユーザーのisReadyをfalseにして保存
    gameState.isAllUsersReady = false;
    resetAllUsersReadyState(gameState);
  }

  // 今回の更新で全員が準備完了でないなら
  await handleSetGameState(gameState);
}

// ユーザーをGameStateに追加する関数 -------------------------------------------------
export function addUserToGameState (
  gameState: GameState,
  userStatus: UserStatus
): void {
  // userStatusのバリデーション
  if (!userStatus.userId || !userStatus.userName) {
    throw new Error('Invalid userStatus: userId and userName are required');
  }

  // ユーザーを追加
  gameState.users.push({
    userId: userStatus.userId,
    userName: userStatus.userName,
    isReady: true,
  });

  // ユーザーの画像配列を初期化
  gameState.images[userStatus.userId] = [];
}

// GameState更新用共通関数 -------------------------------------------------
export async function handleSetGameState (gameState: GameState) {
  await kvSet(gameState.gameId, gameState);
}

// 全ユーザーが準備完了済みか判定する関数 -------------------------------------------------
export function getAllReady (users: UserStatus[]) {
  if (users.length !== 4) return false;
  return users.every(user => user.isReady);
}

// 全ユーザーのisReadyをfalseする関数 -------------------------------------------------
export function resetAllUsersReadyState (gameState: GameState) {
  gameState.users.forEach(user => {
    user.isReady = false;
  });
}

// 一定時間待機する関数 -------------------------------------------------
export function delayMs (ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

// ランダムなお題を返す関数 -------------------------------------------------
export function getRandomTargetTheme () {
  return targetThemes[Math.floor(Math.random() * targetThemes.length)];
}

// GameStateを初期化して作成する関数 -------------------------------------------------
export function createGameState (gameId: string, userStatus: UserStatus) {
  return {
    gameId: gameId,
    round: 0, // 0が最初の部屋入室、1以降がゲーム
    targetTheme: getRandomTargetTheme(), // 部屋作成時にお題テーマ設定
    isAllUsersReady: false,
    users: [],
    images: {},
  } as GameState;
}
