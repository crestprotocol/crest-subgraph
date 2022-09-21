import { Vault } from '../generated/templates';
import { VaultCreated } from "../generated/FactoryData/FactoryData";
import { VaultEntity } from "../generated/schema";

export function handleVaultCreated(event: VaultCreated): void {
  // Start indexing the exchange; `event.params.vault` is the
  // address of the new Vault contract
  Vault.create(event.params.vault);
  let trans_hash = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let vault = new VaultEntity(trans_hash);
  vault.vault = event.params.vault.toHexString();
  vault.pool = event.params.pool.toHexString();
  vault.creator = event.params.creator.toHexString();
  vault.dev = event.params.dev.toHexString();
  vault.withdrawFee = event.params.withdrawFee;
  vault.timestamp = event.block.timestamp;
  vault.save();
}
