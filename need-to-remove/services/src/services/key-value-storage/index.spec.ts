import { instantiateService } from "@ldsg/common";
import { KeyValueStorage, KeyValueStorageService } from ".";
import { SERVICE_TYPE_MAP } from "../../constants";

describe("KeyValueStorageService", () => {
  test("database", async () => {
    const serviceProperties = {
      id: "CURRENT_ID",
      parentId: "6666d6bb232a16222f468046",
      type: "KEY_VALUE_STORAGE",
      settings: {
        uri: "database:key-value-storage",
      },
    };

    const keyValueStorageService = new KeyValueStorageService(
      serviceProperties
    );

    expect(keyValueStorageService.getUriInfo()).toMatchSnapshot();

    expect(keyValueStorageService.getPrefix()).toMatchSnapshot();

    const { service } = instantiateService({
      serviceProperties,
      serviceRecords: [
        {
          id: "6666d6bb232a16222f468046",
          type: "APPLICATION",
          settings: {
            name: "test application name",
            description: "test application description",
            exposeServiceInfo: true,
          },
        },
        {
          id: "6666d6bb232a16222f468048",
          type: "DATABASE",
          parentId: "6666d6bb232a16222f468046",
          settings: {
            uri: "mongodb://root:example@mongo",
            dbName: "test-db",
          },
        },
        serviceProperties,
      ],
      serviceTypeMap: {
        ...SERVICE_TYPE_MAP,
        KEY_VALUE_STORAGE: {
          class: KeyValueStorageService,
        },
      },
    });

    const keyValueStorage: KeyValueStorage = service.getKeyValueStorage();

    expect(keyValueStorage).toBeDefined();

    const TEST_KEY = "hello";

    const TEST_VALUE = "world";

    const TEST_VALUE2 = "world2";

    await keyValueStorage.clear();

    expect(await keyValueStorage.getItem(TEST_KEY)).toBeUndefined();

    /**
     * create
     */
    {
      await keyValueStorage.setItem(TEST_KEY, TEST_VALUE);

      expect(await keyValueStorage.getItem(TEST_KEY)).toBe(TEST_VALUE);
    }

    /**
     * update
     */
    {
      await keyValueStorage.setItem(TEST_KEY, TEST_VALUE2);

      expect(await keyValueStorage.getItem(TEST_KEY)).toBe(TEST_VALUE2);
    }

    /**
     * delete
     */
    {
      await keyValueStorage.removeItem(TEST_KEY);

      expect(await keyValueStorage.getItem(TEST_KEY)).toBeUndefined();
    }

    /**
     * clear
     */
    {
      for (let index = 0; index < 100; index++) {
        await keyValueStorage.setItem(`${TEST_KEY}${index}`, TEST_VALUE);
      }

      await keyValueStorage.clear();

      for (let index = 0; index < 100; index++) {
        expect(
          await keyValueStorage.getItem(`${TEST_KEY}${index}`)
        ).toBeUndefined();
      }
    }
  });
});
