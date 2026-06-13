function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export type AddClientPayload = {
  lastName: string;
  firstName: string;
  patronymic?: string;
};

/** POST /api/database/clients */
export async function addBankClient(
  _payload: AddClientPayload
): Promise<{ clientId: string }> {
  await delay(400);
  return { clientId: 'mock-client-id' };
}

export type InteragencyRequest = {
  id: string;
  department: string;
  status: string;
  createdAt: string;
};

/** GET /api/database/interagency/requests */
export async function getInteragencyRequests(): Promise<InteragencyRequest[]> {
  await delay(300);
  return [];
}
