const express = require('express');
const request = require('supertest');

function createAppForRoute(routePath, routeModule) {
  const app = express();
  app.use(routePath, routeModule);
  return app;
}

describe('route graceful disable', () => {
  describe('OpenCloud route (/oc)', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    test('returns 404 with error when disabled', async () => {
      jest.doMock('../config', () => ({
        opencloud: { enabled: false, url: '' },
        corsOptions: { origin: '.*' },
        logLevel: 'silent',
      }));
      jest.doMock('../utils', () => ({
        stripIntercomCookies: jest.fn(),
        massageCors: jest.fn(),
        logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
      }));
      const oc = require('../routes/oc');
      const app = createAppForRoute('/oc', oc);
      const res = await request(app).get('/oc/');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'OpenCloud integration is not enabled' });
    });
  });

  describe('SOGo route (/sogo)', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    test('returns 404 with error when disabled', async () => {
      jest.doMock('../config', () => ({
        sogo: { enabled: false, url: '' },
        corsOptions: { origin: '.*' },
        logLevel: 'silent',
      }));
      jest.doMock('../utils', () => ({
        stripIntercomCookies: jest.fn(),
        massageCors: jest.fn(),
        logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
      }));
      const sogo = require('../routes/sogo');
      const app = createAppForRoute('/sogo', sogo);
      const res = await request(app).get('/sogo/');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'SOGo integration is not enabled' });
    });
  });

  describe('ILIAS route (/ilias)', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    test('returns 404 with error when disabled', async () => {
      jest.doMock('../config', () => ({
        ilias: { enabled: false, url: '' },
        corsOptions: { origin: '.*' },
        logLevel: 'silent',
      }));
      jest.doMock('../utils', () => ({
        stripIntercomCookies: jest.fn(),
        massageCors: jest.fn(),
        logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
      }));
      const ilias = require('../routes/ilias');
      const app = createAppForRoute('/ilias', ilias);
      const res = await request(app).get('/ilias/');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'ILIAS integration is not enabled' });
    });
  });

  describe('Nextcloud route (/fs, legacy)', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    test('returns 404 with error when disabled', async () => {
      jest.doMock('../config', () => ({
        nextcloud: { enabled: false, url: '' },
        corsOptions: { origin: '.*' },
        logLevel: 'silent',
      }));
      jest.doMock('../utils', () => ({
        stripIntercomCookies: jest.fn(),
        massageCors: jest.fn(),
        logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
      }));
      const fs = require('../routes/fs');
      const app = createAppForRoute('/fs', fs);
      const res = await request(app).get('/fs/');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Nextcloud integration is not enabled' });
    });
  });

  describe('wiki route (/wiki)', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    test('returns 404 with error when disabled', async () => {
      jest.doMock('../config', () => ({
        xwiki: { enabled: false, url: '' },
        corsOptions: { origin: '.*' },
        logLevel: 'silent',
      }));
      jest.doMock('../utils', () => ({
        stripIntercomCookies: jest.fn(),
        massageCors: jest.fn(),
        logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
      }));
      const wiki = require('../routes/wiki');
      const app = createAppForRoute('/wiki', wiki);
      const res = await request(app).get('/wiki/');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'XWiki integration is not enabled' });
    });
  });

  describe('nob route (/nob)', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    test('returns 404 with error when disabled', async () => {
      jest.doMock('../config', () => ({
        nordeck: { url: '' },
        corsOptions: { origin: '.*' },
        logLevel: 'silent',
      }));
      jest.doMock('../utils', () => ({
        stripIntercomCookies: jest.fn(),
        massageCors: jest.fn(),
        logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
      }));
      const nob = require('../routes/nob');
      const app = createAppForRoute('/nob', nob);
      const res = await request(app).get('/nob/');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Nordeck integration is not configured' });
    });
  });

  describe('navigation route (/navigation.json)', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    test('returns 404 with error when portal url is not set', async () => {
      jest.doMock('../config', () => ({
        portal: { url: '' },
        corsOptions: { origin: '.*' },
        logLevel: 'silent',
      }));
      jest.doMock('../utils', () => ({
        stripIntercomCookies: jest.fn(),
        massageCors: jest.fn(),
        logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() },
      }));
      const navigation = require('../routes/navigation');
      const app = createAppForRoute('/navigation.json', navigation);
      const res = await request(app).get('/navigation.json');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Portal integration is not configured' });
    });
  });
});
