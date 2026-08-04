"use client";

import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { HeroFormDialog } from "@/components/admin/hero/hero-form-dialog";
import { HeroList } from "@/components/admin/hero/hero-list";
import { ResourcePage } from "@/components/admin/resource-page";
import { Button } from "@/components/ui/button";
import { deleteHeroSlide, listHeroSlides } from "@/lib/admin-api";

export default function AdminHeroPage() {
  const [items, setItems] = useState([]);
  const [maxItems, setMaxItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await listHeroSlides();
      setItems(data.items || []);
      setMaxItems(data.maxItems || 8);
    } catch (loadError) {
      setError(loadError.message || "Hero kayıtları yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchItems() {
      try {
        const data = await listHeroSlides();

        if (cancelled) return;

        setItems(data.items || []);
        setMaxItems(data.maxItems || 8);
        setError("");
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message || "Hero kayıtları yüklenemedi.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchItems();

    return () => {
      cancelled = true;
    };
  }, [loadItems]);

  async function handleDelete(item) {
    const confirmed = window.confirm(`"${item.titleTr}" hero kaydını silmek istiyor musunuz?`);

    if (!confirmed) return;

    try {
      await deleteHeroSlide(item.id);
      await loadItems();
    } catch (deleteError) {
      setError(deleteError.message || "Hero kaydı silinemedi.");
    }
  }

  function handleCreate() {
    setEditingItem(null);
    setDialogOpen(true);
  }

  function handleEdit(item) {
    setEditingItem(item);
    setDialogOpen(true);
  }

  return (
    <>
      <ResourcePage
        actions={
          <Button disabled={items.length >= maxItems} onClick={handleCreate} variant="secondary">
            <Plus aria-hidden="true" className="size-4" />
            Yeni hero kaydı
          </Button>
        }
        title="Hero Yönetimi"
        description="Ana sayfa hero carousel içeriğini Türkçe/İngilizce olarak yönetin. En fazla 8 kayıt eklenebilir; görseller 16:9 oranında yüklenir."
      >
        <div className="grid gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-line bg-surface px-4 py-3 text-sm text-muted">
            <p>
              Toplam kayıt: <span className="font-semibold text-ink">{items.length}</span> / {maxItems}
            </p>
            <p>Responsive hero görünümüyle uyum için tüm görseller sabit 16:9 oranında tutulur.</p>
          </div>

          {error ? (
            <p className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {error}
            </p>
          ) : null}

          {loading ? (
            <div className="rounded-[8px] border border-line bg-white px-4 py-10 text-center text-sm text-muted">
              Hero kayıtları yükleniyor...
            </div>
          ) : (
            <HeroList items={items} onDelete={handleDelete} onEdit={handleEdit} />
          )}
        </div>
      </ResourcePage>

      <HeroFormDialog
        key={`${editingItem?.id || "new"}-${dialogOpen ? "open" : "closed"}`}
        item={editingItem}
        itemCount={items.length}
        maxItems={maxItems}
        onOpenChange={setDialogOpen}
        onSaved={loadItems}
        open={dialogOpen}
      />
    </>
  );
}
